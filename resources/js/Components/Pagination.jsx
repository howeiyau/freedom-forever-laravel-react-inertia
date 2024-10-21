import { Link } from "@inertiajs/react";

export default function Pagination({ links, queryParams = null }) {
    const buildURL = (url) => {
        if(url){
            let queries = '';
            delete queryParams.page;

            for (let key in queryParams){
                queries += '&' + key + '=' + queryParams[key];
            }
            url += queries;
        }   

        return url;
    }

    return (
        <nav className="text-center my-3">
            {links.map((link) => (
                <Link 
                    className={
                        "inline-block p-3 rounded-lg " + 
                        (link.active ? "bg-gray-100 " : " ") +
                        (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:bg-gray-100 ")
                    }
                    key={link.label}
                    href={buildURL(link.url)}
                    dangerouslySetInnerHTML={{__html: link.label}}></Link>
            ))}
        </nav>
    );
}