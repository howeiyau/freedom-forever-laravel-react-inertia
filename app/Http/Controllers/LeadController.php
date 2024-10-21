<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\Models\Lead;
use App\Http\Resources\LeadResource;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Lead::query();

        $sort = request("sort", "created_at");
        $order = request("order", "desc");

        if(request("search")){
            $query->where("name", "like", "%" . request("search") . "%")
                ->orWhere("email", "like", "%" . request("search") . "%");
        }
        $leads = $query->orderBy($sort, $order)->paginate(1000)->onEachSide(1);

        return inertia("Lead/Index", [
            "leads" => LeadResource::collection($leads),
            "queryParams" => request()->query() ?: null,
            "success" => session("success")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Lead/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeadRequest $request)
    {
        $data = $request->validated();
        $data['created_at'] = now();
        $data['updated_at'] = now();
        $lead = Lead::create($data);

        return to_route('lead.index')
                ->with('success', 'Lead "' . $lead->id . ' : ' . $lead->name . '" was added');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lead $lead)
    {
        return inertia('Lead/Edit', [
            "lead" => $lead
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeadRequest $request, Lead $lead)
    {
        $data = $request->validated();
        $data['updated_at'] = now();
        $lead->update($data);

        return to_route('lead.index')
                ->with('success', 'Lead "' . $lead->id . ' : ' . $lead->name . '" was updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        $lead->delete();
        return to_route('lead.index')
                ->with('success', 'Lead "' . $lead->id . ' : ' . $lead->name . '" was deleted');
    }
}
