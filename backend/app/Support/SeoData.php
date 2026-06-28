<?php

namespace App\Support;

class SeoData
{
    /** @var array<int, array{id: string, related: string[], copy: array<string, mixed>}>|null */
    private static ?array $pages = null;

    /** @var array<int, array<string, mixed>>|null */
    private static ?array $blog = null;

    /** @return array<int, array{id: string, related: string[], copy: array<string, mixed>}> */
    public static function pages(): array
    {
        if (self::$pages === null) {
            $path = base_path('data/seo-pages.json');
            self::$pages = is_file($path)
                ? (json_decode(file_get_contents($path), true) ?? [])
                : [];
        }

        return self::$pages;
    }

    /** @return array<string, mixed>|null */
    public static function page(string $slug): ?array
    {
        foreach (self::pages() as $page) {
            if ($page['id'] === $slug) {
                return $page;
            }
        }

        return null;
    }

    /** @return string[] */
    public static function slugs(): array
    {
        return array_map(fn (array $p) => $p['id'], self::pages());
    }

    /** @return array<int, array<string, mixed>> */
    public static function blogPosts(): array
    {
        if (self::$blog === null) {
            $path = base_path('data/blog-posts.json');
            self::$blog = is_file($path)
                ? (json_decode(file_get_contents($path), true) ?? [])
                : [];
        }

        return self::$blog;
    }

    /** @return array<string, mixed>|null */
    public static function blogPost(string $slug): ?array
    {
        foreach (self::blogPosts() as $post) {
            if ($post['slug'] === $slug) {
                return $post;
            }
        }

        return null;
    }
}
