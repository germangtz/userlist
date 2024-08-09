import {useState, useEffect} from "react";
 
const useUsers = (url) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(url);
                if (!response.ok) throw new Error('Error al obtener los datos');
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            }
            catch (err){
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    const filteredUsers =  users.filter((user) => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return {users: filteredUsers, loading, error, searchTerm, setSearchTerm};
};

export default useUsers;