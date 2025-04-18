<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Simulation extends Model
{
    use HasFactory;

    protected $table = 'simulations';
    protected $primaryKey = 'id_simulation';
    public $timestamps = true;

    protected $fillable = [
        'id_user',
        'id_type_credit',
        'montant',
        'mensualite',
        'duree'
    ];

    protected $casts = [
        'montant' => 'decimal:2',
        'mensualite' => 'decimal:2',
        'duree' => 'integer'
    ];

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    // Relation avec le type de crédit
    public function creditType()
    {
        return $this->belongsTo(CreditType::class, 'id_type_credit', 'id_type_credit');
    }
} 