import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ leads, queryParams = null, success }) {
    queryParams = queryParams || {}
    
    const searchUpdated = (value) => {
        if(value){
            queryParams.search = value;
        }else{
            delete queryParams['search'];
        }

        router.get(route('lead.index'), queryParams);
    }

    const sortUpdated = (sort) => {
        if(sort == queryParams.sort){
            queryParams.order = (queryParams.order == "desc") ? "asc" : "desc";
        }else{
            queryParams.sort = sort;
            queryParams.order = "asc";
        }

        router.get(route('lead.index'), queryParams);
    }

    const deleteLead = (lead) => {
        if(!window.confirm("Confirm delete lead?")) return;
        router.delete(route('lead.destroy', lead));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Leads
                </h2>
            }
        >
            <Head title="Leads" />
            
            {success && (
                <div id="success" className="bg-green-400 p-2 text-center">{success}</div>
            )}
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TextInput 
                                className="w-64"
                                placeholder="Search by Name or Email"
                                defaultValue={queryParams.search}
                                onBlur={e => searchUpdated(e.target.value)}
                                onKeyPress={e => {if(e.key == 'Enter') searchUpdated(e.target.value)}} />

                            <Link href={route("lead.create")} className="float-right bg-green-400 hover:bg-green-500 p-3 rounded-lg">Add Lead</Link>

                            <Pagination links={leads.meta.links} queryParams={queryParams}></Pagination>
                            <div className="max-h-[1000px] overflow-auto">
                                <table className="text-left w-full">
                                    <thead className="uppercase bg-gray-100 p-5">
                                        <tr className="text-nowrap">
                                            <th onClick={(e) => sortUpdated("id")}>
                                                <div className="p-2 flex items-center justify-between gap-1 cursor-pointer">
                                                    ID
                                                    <div>
                                                        <div className={ 
                                                            (queryParams.sort == 'id' && 
                                                            queryParams.order == 'asc' ? 'text-black' : 'text-gray-400')}>&uarr;</div>
                                                        <div className={"-mt-2 " + 
                                                            (queryParams.sort == 'id' && 
                                                            queryParams.order == 'desc' ? 'text-black' : 'text-gray-400')}>&darr;</div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={(e) => sortUpdated("name")}>
                                                <div className="p-2 flex items-center justify-between gap-1 cursor-pointer">
                                                    Name
                                                    <div>
                                                        <div className={ 
                                                            (queryParams.sort == 'name' && 
                                                            queryParams.order == 'asc' ? 'text-black' : 'text-gray-400')}>&uarr;</div>
                                                        <div className={"-mt-2 " + 
                                                            (queryParams.sort == 'name' && 
                                                            queryParams.order == 'desc' ? 'text-black' : 'text-gray-400')}>&darr;</div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={(e) => sortUpdated("email")}>
                                                <div className="p-2 flex items-center justify-between gap-1 cursor-pointer">
                                                    Email
                                                    <div>
                                                        <div className={ 
                                                            (queryParams.sort == 'email' && 
                                                            queryParams.order == 'asc' ? 'text-black' : 'text-gray-400')}>&uarr;</div>
                                                        <div className={"-mt-2 " + 
                                                            (queryParams.sort == 'email' && 
                                                            queryParams.order == 'desc' ? 'text-black' : 'text-gray-400')}>&darr;</div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={(e) => sortUpdated("phone")}>
                                                <div className="p-2 flex items-center justify-between gap-1 cursor-pointer">
                                                    Phone
                                                    <div>
                                                        <div className={ 
                                                            (queryParams.sort == 'phone' && 
                                                            queryParams.order == 'asc' ? 'text-black' : 'text-gray-400')}>&uarr;</div>
                                                        <div className={"-mt-2 " + 
                                                            (queryParams.sort == 'phone' && 
                                                            queryParams.order == 'desc' ? 'text-black' : 'text-gray-400')}>&darr;</div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={(e) => sortUpdated("lead_status_id")}>
                                                <div className="p-2 flex items-center justify-between gap-1 cursor-pointer">
                                                    Status
                                                    <div>
                                                        <div className={ 
                                                            (queryParams.sort == 'lead_status_id' && 
                                                            queryParams.order == 'asc' ? 'text-black' : 'text-gray-400')}>&uarr;</div>
                                                        <div className={"-mt-2 " + 
                                                            (queryParams.sort == 'lead_status_id' && 
                                                            queryParams.order == 'desc' ? 'text-black' : 'text-gray-400')}>&darr;</div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={(e) => sortUpdated("created_at")}>
                                                <div className="p-2 flex items-center justify-between gap-1 cursor-pointer">
                                                    Created
                                                    <div>
                                                        <div className={ 
                                                            (queryParams.sort == 'created_at' && 
                                                            queryParams.order == 'asc' ? 'text-black' : 'text-gray-400')}>&uarr;</div>
                                                        <div className={"-mt-2 " + 
                                                            (queryParams.sort == 'created_at' && 
                                                            queryParams.order == 'desc' ? 'text-black' : 'text-gray-400')}>&darr;</div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={(e) => sortUpdated("updated_at")}>
                                                <div className="p-2 flex items-center justify-between gap-1 cursor-pointer">
                                                    Updated
                                                    <div>
                                                        <div className={ 
                                                            (queryParams.sort == 'updated_at' && 
                                                            queryParams.order == 'asc' ? 'text-black' : 'text-gray-400')}>&uarr;</div>
                                                        <div className={"-mt-2 " + 
                                                            (queryParams.sort == 'updated_at' && 
                                                            queryParams.order == 'desc' ? 'text-black' : 'text-gray-400')}>&darr;</div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leads.data.map((lead) => (
                                        <tr key={lead.id} className="border-b">
                                            <td className="p-2">{lead.id}</td>
                                            <td className="p-2">{lead.name}</td>
                                            <td className="p-2">{lead.email}</td>
                                            <td className="p-2">{lead.phone}</td>
                                            <td className="text-nowrap p-2">{lead.lead_status.name}</td>
                                            <td className="p-2">{lead.created_at}</td>
                                            <td className="p-2">{lead.updated_at}</td>
                                            <td className="text-nowrap p-2">
                                                <Link href={route('lead.edit', lead.id)} className="text-blue-600 hover:underline mx-1">Edit</Link>
                                                <button onClick={(e) => deleteLead(lead)} className="text-red-600 hover:underline mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={leads.meta.links} queryParams={queryParams}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
