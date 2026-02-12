import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaylistById, updatePlaylist } from "../../store/slices/playListSlice";
import { ArrowLeft, Save } from "lucide-react";
import {Button, Input} from "../index.js";


const UpdatePlaylist = () => {
    const { playlistId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { playlist, loading } = useSelector((state) => state.playlist);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [error, setError] = useState(null);

    const validation = {
        name: [
            {required: true, message: "Please enter name"},
            {minLength: 3, message: "Name should atleast 3 charater long"}
        ],

        description: [
              {required: true, message: "Please enter description"},
        ]
    }

    const validate = (formData) => {
        const errorData = {};

        Object.entries(formData).forEach(([key, value]) => {
            validation[key].some((rule) => {
                if (rule.required && !value ) {
                    return true;
                }

                if (rule.minLength && value.length < rule.minLength) {
                    return true;
                }
            })
        });

        setError(errorData);
        return errorData;
    }

    useEffect(() => {
        if (playlist) {
            setFormData({
                name: playlist.name || "",
                description: playlist.description || "",
            })
        }
    }, [playlist]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateResult = validate(formData);

        if(validateResult.length) return;

        await dispatch(updatePlaylist({ playlistId, playlistData: formData }));

        navigate(-1);
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-6">
            <div className="max-w-xl mx-auto bg-neutral-900 p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <h1 className="text-2xl font-bold">Update Playlist</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <Input name="name" label="Name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <Input name="description" label="Description" value={formData.description} onChange={handleChange}/>
                    </div>
                    <Button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg font-medium">
                        <Save className="w-4 h-4" />
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePlaylist;