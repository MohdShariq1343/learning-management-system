<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void{
       // This share the $adm variable with ALL views
     //    View::composer('*', function ($view) {
     //    $adm = DB::table('app_data')->where('id', 1)->first();
     //    $view->with('adm', $adm);
     // });
  }
}
