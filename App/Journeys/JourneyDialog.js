import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Dialog,
    MenuItem,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const JourneyDialog = ({ open, onClose, onSubmit, initialData = null, loading }) => {
    const [journeyData, setJourneyData] = useState({
        name: '',
        description: '',
        client: ''
    });

    const {clients} = useSelector(state => state);

    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (initialData) {
            setJourneyData({
                name: initialData.name || '',
                description: initialData.description || '',
                client: initialData.client ? initialData.client.id : ''
            });
        } else {
            setJourneyData({ name: '', description: '', client: '' });
        }
    }, [initialData, open]);

    const handleFieldChange = (field) => (event) => {
        setJourneyData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSubmit = () => {
        onSubmit(journeyData);
        handleClose();
    };

    const handleClose = () => {
        setJourneyData({ name: '', description: '', client: '' });
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{isEditMode ? 'Edit Journey' : 'Create New Journey'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Journey Name"
                    fullWidth
                    value={journeyData.name}
                    onChange={handleFieldChange('name')}
                    sx={{ mb: 2, mt: 1 }}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={journeyData.description}
                    onChange={handleFieldChange('description')}
                />
                <TextField
                    select
                    margin="dense"
                    label="Client"
                    fullWidth
                    value={journeyData.client}
                    onChange={handleFieldChange('client')}
                    disabled={isEditMode}
                >
                    <MenuItem value="">
                        <em>Select a client</em>
                    </MenuItem>
                    {clients.data.map(client => (
                        <MenuItem key={client.id} value={client.id}>
                            {client.name}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton 
                    loading={loading}
                    onClick={handleSubmit} 
                    variant="contained"
                    disabled={!journeyData.name.trim() || !journeyData.client}
                >
                    {isEditMode ? 'Save Changes' : 'Create'}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default JourneyDialog; 