import frontmatter
import json
from pathlib import Path

TOPICS_DIR = Path("topics")
OUTPUT_FILE = Path("data/related-topics.json")

posts = []

# Load all markdown files
for md_file in TOPICS_DIR.glob("*.md"):

    post = frontmatter.load(md_file)

    posts.append({
        "slug": md_file.stem,
        "tags": set(post.get("tags", []))
    })

related_topics = {}

for current_post in posts:

    current_slug = current_post["slug"]

    similarities = []

    for other_post in posts:

        if current_post == other_post:
            continue

        common_tags = (
            current_post["tags"]
            &
            other_post["tags"]
        )

        score = len(common_tags)

        if score > 0:
            similarities.append(
                (
                    other_post["slug"],
                    score
                )
            )

    similarities.sort(
        key=lambda item: item[1],
        reverse=True
    )

    related_topics[current_slug] = [
        slug
        for slug, score in similarities[:5]
    ]

OUTPUT_FILE.parent.mkdir(exist_ok=True)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(
        related_topics,
        f,
        indent=2,
        ensure_ascii=False
    )

print("related-topics.json generated successfully.")
