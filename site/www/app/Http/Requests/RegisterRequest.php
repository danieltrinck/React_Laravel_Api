<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'      => 'required|string|max:155',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => 'required|min:3|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'name.required'      => 'O nome é obrigatório.',
            'name.string'        => 'O campo nome é permitido apenas letras.',
            'name.max'           => 'O nome não pode exceder a 255 caracters.',
            'email.required'     => 'TO e-mail é obrigatório.',
            'email.email'        => 'O e-mail é inválido.',
            'email.unique'       => 'O e-mail já está cadastrado.',
            'password.required'  => 'O campo senha é obrigatório.',
            'password.min'       => 'A senha precisa ser maior que 3 caracteres.',
            'password.confirmed' => 'Os campos senhas não conferem, digite novamente.',
        ];
    }
}
