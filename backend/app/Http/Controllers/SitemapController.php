<?php

namespace App\Http\Controllers;

use App\Support\SeoData;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $base = rtrim(config('site.url'), '/');
        $urls = [
            ['loc' => $base.'/', 'priority' => '1.0'],
            ['loc' => $base.'/blog/', 'priority' => '0.8'],
            ['loc' => $base.'/guides/', 'priority' => '0.7'],
            ['loc' => $base.'/airport-guides/', 'priority' => '0.7'],
            ['loc' => $base.'/travel-tips/', 'priority' => '0.7'],
        ];

        foreach (SeoData::slugs() as $slug) {
            $urls[] = ['loc' => $base.'/'.$slug.'/', 'priority' => '0.9'];
        }

        foreach (SeoData::blogPosts() as $post) {
            $urls[] = ['loc' => $base.'/blog/'.$post['slug'].'/', 'priority' => '0.7'];
        }

        $xml = view('sitemap', ['urls' => $urls])->render();

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
