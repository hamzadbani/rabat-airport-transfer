<?php

namespace App\Support;

class SeoCopyResolver
{
    /**
     * @param  array<string, mixed>  $page
     * @return array<string, mixed>
     */
    public static function resolve(array $page, ?string $locale = null): array
    {
        $locale ??= app()->getLocale();
        $copy = $page['copy'];

        if ($locale === 'fr') {
            return $copy;
        }

        $key = 'seo_pages.'.$page['id'];
        $overrides = trans($key, [], $locale);

        if (is_array($overrides) && ! empty($overrides)) {
            return array_replace_recursive($copy, $overrides);
        }

        return $copy;
    }
}
