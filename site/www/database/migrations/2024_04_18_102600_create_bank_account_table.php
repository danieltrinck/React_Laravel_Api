<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default("D")->comment("(D) Depósito ,(T) Transfêrencia");
            $table->string('transfer')->nullable()->comment("Comprovante de tansfêrencia");
            $table->string('deposit')->nullable()->comment("Comprovante de depósito");
            $table->string('value')->comment("Valor depositado ou transferido");
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('to_id');
            $table->foreign('to_id')->references('id')->on('users');
            $table->unsignedBigInteger('accounts_id');
            $table->foreign('accounts_id')->references('id')->on('accounts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_accounts');
    }
};
