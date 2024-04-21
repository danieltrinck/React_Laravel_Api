<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DepositRequest extends FormRequest
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
            'valor' => 'required|numeric|gt:0',
            'id'    => 'required',
        ];
    }

    public function messages()
    {
        return [
            'valor.required' => 'O valor do depósito é obrigatório.',
            'valor.numeric'  => 'O valor está inválido.',
            'valor.gt'       => 'O valor de depósito precisa ser maior que 0 (zero).',
            'id.required'    => 'Identificador do usuário inválido.',
        ];
    }
}
