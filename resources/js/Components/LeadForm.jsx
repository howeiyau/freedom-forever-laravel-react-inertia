import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';

export default function LeadForm({ lead = {} }) {
    const {data, setData, post, put, errors} = useForm({
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        lead_status_id: lead.lead_status_id || '',
    })

    const submitForm = (e) => {
        e.preventDefault();

        if(lead.id){
            put(route("lead.update", lead));
        }else{
            post(route("lead.store"));
        }
    }

    return (
        <form onSubmit={submitForm}>
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <InputLabel 
                        htmlFor="lead_name"
                        value="Name"
                        />
                    <TextInput 
                        className="w-full"
                        id="lead_name"
                        name="name"
                        value={data.name}
                        onChange={e => setData("name", e.target.value)}
                        />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <InputLabel 
                        htmlFor="lead_email"
                        value="Email"
                        />
                    <TextInput 
                        className="w-full"
                        id="lead_email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={e => setData("email", e.target.value)}
                        />
                    <InputError message={errors.email} />
                </div>
                <div>
                    <InputLabel 
                        htmlFor="lead_phone"
                        value="Phone"
                        />
                    <TextInput 
                        className="w-full"
                        id="lead_phone"
                        name="phone"
                        value={data.phone}
                        onChange={e => setData("phone", e.target.value)}
                        />
                    <InputError message={errors.phone} />
                </div>
                <div>
                    <InputLabel 
                        htmlFor="lead_status"
                        value="Status"
                        />
                    <SelectInput
                        className="w-full"
                        id="lead_status"
                        name="lead_status_id"
                        value={data.lead_status_id}
                        onChange={e => setData("lead_status_id", e.target.value)}
                        >
                        <option value="">Select Status</option>
                        <option value="1">New Lead</option>
                        <option value="2">Appointment Set</option>
                        <option value="3">Deal lost</option>
                        <option value="4">Deal won</option>
                        <option value="5">Sold</option>
                    </SelectInput>
                    <InputError message={errors.lead_status_id} />
                </div>
            </div>
            <div className="mt-4 text-right">
                <Link 
                    href={route("lead.index")}
                    className="bg-gray-100 px-5 py-4 hover:bg-gray-200 mr-2 rounded-lg">Cancel</Link>
                <button className="bg-green-400 hover:bg-green-500 px-5 py-3 rounded-lg">Save</button>
            </div>
        </form>
    );
}