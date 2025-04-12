<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditType extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_type_credit',
        'nom'
    ];

    public function simulations()
    {
        return $this->hasMany(Simulation::class, 'id_type_credit');
    }
}