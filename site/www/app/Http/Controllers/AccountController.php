<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\DepositRequest;
use App\Http\Requests\TransfRequest;
use App\Models\User;
use App\Models\Account;
use App\Models\BankAccount;
use DB;

class AccountController extends Controller
{
    protected $users;
    protected $account;
    protected $bankAccount;

    public function __construct(
        User                 $users,
        Account              $account,
        BankAccount          $bankAccount
    ){
        $this->users       = $users;
        $this->account     = $account;
        $this->bankAccount = $bankAccount;
    }

    public function deposit(DepositRequest $request)
    {
        try {
        
            DB::beginTransaction();
            $account = $this->account->where('user_id', $request->id)->first();
            if($account)
            {
                $valor = str_replace(',','.',str_replace('.','',$account->value));
                $valor = $valor + $request->valor;
                $account->value = $valor;
                $account->save();
                $account = $account->id;
            }else{

                $account = $this->account->create([
                    'user_id' => $request->id,
                    'value'   => number_format($request->valor,2)
                ])->id;
            }

            $comprovant = $this->comprovant('deposit');

            $this->bankAccount->create([
                'type'        => 'D',
                'deposit'     => $comprovant,
                'user_id'     => $request->user()->id,
                'to_id'       => $request->id,
                'accounts_id' => $account,
                'value'       => number_format($request->valor,2)
            ]);

            DB::commit();
            return response(['comprovant' => $comprovant], 200);

        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return response([
                'errors' => [
                    'valor' => 'A transação não foi realizada devido a um problema interno.'
                    ]
                ], 422);
        }

    }

    public function transfer(TransfRequest $request)
    {
        try {
        
            DB::beginTransaction();
            $account = $this->account->where('user_id', $request->user()->id)->first();
            if($account)
            {
                $valor = str_replace(',','.',str_replace('.','',$account->value));
                $valor = $valor - $request->valor;
                $account->value = $valor;
                $account->save();
                $account = $account->id;

                $accountTransfer = $this->account->where('user_id', $request->id)->first();
                if($accountTransfer){

                    $valor = str_replace(',','.',str_replace('.','',$accountTransfer->value));
                    $valor = $valor + $request->valor;
                    $accountTransfer->value = $valor;
                    $accountTransfer->save();

                }else{
                
                    $account = $this->account->create([
                        'user_id' => $request->id,
                        'value'   => number_format($request->valor,2)
                    ])->id;
                }

            }else{

                $account = $this->account->create([
                    'user_id' => $request->id,
                    'value'   => number_format($request->valor,2)
                ])->id;
            }

            $comprovant = $this->comprovant('transfer');

            $this->bankAccount->create([
                'type'        => 'T',
                'transfer'    => $comprovant,
                'user_id'     => $request->user()->id,
                'to_id'       => $request->id,
                'accounts_id' => $account,
                'value'       => number_format($request->valor,2)
            ]);

            DB::commit();
            return response(['comprovant' => $comprovant], 200);

        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return response([
                'errors' => [
                    'valor' => 'A transação não foi realizada devido a um problema interno.'
                    ]
                ], 422);
        }

    }

    private function comprovant($type){
        if($type == "deposit"){
            return "DEP".random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9);
        }else{
            return "TRANSF".random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9);
        }
    }

    public function getUser(Request $request)
    {
        return $this->users->where('id',$request->id)->first();
    }

    public function historic(Request $request)
    {
        return $this->bankAccount->with(['user','to'])->where('user_id',$request->id)->paginate('10');
    }
}
