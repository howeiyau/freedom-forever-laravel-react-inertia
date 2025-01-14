<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadStatus extends Model
{
    /** @use HasFactory<\Database\Factories\LeadStatusFactory> */
    use HasFactory;

    protected $table = 'lead_statuses';
}
