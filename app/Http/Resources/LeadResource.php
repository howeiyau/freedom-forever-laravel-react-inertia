<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class LeadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "phone" => $this->phone,
            "lead_status" => $this->leadStatus,
            "created_at" => (new Carbon($this->created_at))->format('Y-m-d H:m:s'),
            "updated_at" => (new Carbon($this->updated_at))->format('Y-m-d H:m:s'),
        ];
    }
}
