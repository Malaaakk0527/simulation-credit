<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditType extends Model
{
    use HasFactory;

    protected $table = 'credit_types';
    protected $primaryKey = 'id_type_credit';
    public $timestamps = true;

    protected $fillable = [
        'nom_type',
        'description'
    ];

    // Relation avec les simulations
    public function simulations()
    {
        return $this->hasMany(Simulation::class, 'id_type_credit', 'id_type_credit');
    }
} 