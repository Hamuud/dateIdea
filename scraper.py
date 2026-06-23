import requests
import json
import os
from datetime import datetime

API_URL = 'https://api.miromax.ua/api/movies'
CINEMA = 'ternopil'
YOUTUBE_API_KEY = os.environ.get('YOUTUBE_API_KEY', '')
OUTPUT_PATHS = ['data/movies.json', 'public/data/movies.json']


def fetch_movies():
    response = requests.get(API_URL, params={'cinema': CINEMA}, timeout=15)
    response.raise_for_status()
    return response.json()


def fetch_trailer(title):
    if not YOUTUBE_API_KEY:
        return None

    query = f'{title} офіційний трейлер українською'
    url = 'https://www.googleapis.com/youtube/v3/search'
    params = {
        'part': 'snippet',
        'q': query,
        'type': 'video',
        'maxResults': 1,
        'key': YOUTUBE_API_KEY,
    }
    try:
        r = requests.get(url, params=params, timeout=10)
        r.raise_for_status()
        items = r.json().get('items', [])
        if items:
            video_id = items[0]['id']['videoId']
            return f'https://www.youtube.com/embed/{video_id}'
    except Exception as e:
        print(f'  [WARN] Trailer fetch failed for "{title}": {e}')
    return None


def transform_movies(raw_data):
    today = datetime.now().strftime('%Y-%m-%d')
    today_data = next((d for d in raw_data if d.get('startDate') == today), None)
    if not today_data:
        today_data = raw_data[0] if raw_data else {'movies': []}

    movies = []
    for movie in today_data.get('movies', []):
        showtimes = []
        seen_times = set()
        for event in movie.get('events', []):
            dt = event.get('startDateTime', '')
            if dt:
                time_str = dt.split(' ')[1][:5] if ' ' in dt else dt
                hall = event.get('hall', {}).get('name', '')
                fmt = event.get('format', '')
                key = f'{time_str}-{hall}-{fmt}'
                if key not in seen_times:
                    seen_times.add(key)
                    showtimes.append({
                        'time': time_str,
                        'hall': hall,
                        'format': fmt,
                    })

        trailer = fetch_trailer(movie['name'])
        print(f'  {movie["name"]} — {len(showtimes)} showtimes — trailer: {"yes" if trailer else "no"}')

        movies.append({
            'id': movie.get('id', ''),
            'title': movie.get('name', ''),
            'slug': movie.get('slug', ''),
            'genres': movie.get('genres', ''),
            'ageLimit': movie.get('ageLimit', ''),
            'poster': movie.get('posterLink', ''),
            'trailer': trailer,
            'showtimes': showtimes,
            'detailUrl': f'https://miromax.ua/movies/{movie["slug"]}?cinema={CINEMA}',
        })

    return movies


def main():
    print(f'[{datetime.now().isoformat()}] Fetching movies from {API_URL}?cinema={CINEMA}')
    raw = fetch_movies()
    print(f'Got {sum(len(d.get("movies", [])) for d in raw)} movie entries across {len(raw)} day(s)')

    movies = transform_movies(raw)
    print(f'Processed {len(movies)} unique movies')

    output = {
        'updatedAt': datetime.now(tz=__import__('datetime').timezone.utc).isoformat(),
        'cinema': CINEMA,
        'movies': movies,
    }

    for path in OUTPUT_PATHS:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
        print(f'Saved to {path}')


if __name__ == '__main__':
    main()
