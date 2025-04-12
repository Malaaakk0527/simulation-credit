<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Simulation extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_type_credit',
        'mensualite',
        'montant',
        'id_simulation'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function creditType()
    {
        return $this->belongsTo(CreditType::class, 'id_type_credit');
    }
}