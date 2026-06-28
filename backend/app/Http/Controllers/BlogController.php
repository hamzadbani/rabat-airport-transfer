<?php

namespace App\Http\Controllers;

use App\Support\SeoData;
use Illuminate\View\View;

class BlogController extends Controller
{
    public function index(): View
    {
        return view('blog.index', [
            'posts' => SeoData::blogPosts(),
        ]);
    }

    public function show(string $slug): View
    {
        $post = SeoData::blogPost($slug);

        abort_if($post === null, 404);

        return view('blog.show', [
            'post' => $post,
        ]);
    }
}
