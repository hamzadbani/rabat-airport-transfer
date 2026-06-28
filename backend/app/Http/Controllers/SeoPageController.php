<?php

namespace App\Http\Controllers;

use App\Support\SeoCopyResolver;
use App\Support\SeoData;
use Illuminate\View\View;

class SeoPageController extends Controller
{
    public function show(string $slug): View
    {
        $page = SeoData::page($slug);

        abort_if($page === null, 404);

        return view('seo.show', [
            'page' => $page,
            'slug' => $slug,
            'copy' => SeoCopyResolver::resolve($page),
        ]);
    }
}
