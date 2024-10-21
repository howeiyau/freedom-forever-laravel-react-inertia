<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    /** @use HasFactory<\Database\Factories\LeadFactory> */
    use HasFactory;

    protected $table = 'leads';

    protected $fillable = ['name', 'email', 'phone', 'lead_status_id', 'created_at', 'updated_at'];

    /**
     * Get the lead_status that owns the lead.
     */
    public function leadStatus()
    {
        return $this->belongsTo(LeadStatus::class, 'lead_status_id');
    }
}
