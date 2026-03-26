<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        view::share('data','Hi good morning');  //share data to all views
        view::share('infro','Hi i am in class 223is');
        view::share('details','hi i am leaning sharing data across all views ');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}