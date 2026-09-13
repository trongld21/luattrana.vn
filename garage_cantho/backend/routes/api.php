<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CarListingController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\RescueController;

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

Route::post('/bookings', [BookingController::class, 'store']);

Route::get('/cars', [CarListingController::class, 'index']);
Route::get('/cars/{id}', [CarListingController::class, 'show']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);

Route::post('/rescue', [RescueController::class, 'store']);
