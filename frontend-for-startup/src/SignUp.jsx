import React, { useState, useCallback } from 'react';
import { Container, Tabs, Tab, Box, Typography, TextField, Checkbox, FormControlLabel, Button, Select, MenuItem, InputLabel, FormControl, CircularProgress, Alert } from "@mui/material";
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useSignUpStore from './stores/signUpStore';
import {toast} from "react-toastify";

const CommonForm = ({ handleChange, formData }) => {
  const { t } = useTranslation();


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onSubmit(formData, type);
  // };

  return (
    <Box sx={{ mt: 3 }}>
      <TextField fullWidth margin="normal" name="firstName" label={t('sign_up.firstName')} required value={formData.firstName} onChange={handleChange} />
      <TextField fullWidth margin="normal" name="lastName" label={t('sign_up.lastName')} required value={formData.lastName} onChange={handleChange} />
      <TextField fullWidth margin="normal" name="email" label={t('sign_up.email')} type="email" required value={formData.email} onChange={handleChange} />
      <TextField fullWidth margin="normal" name="username" label={t('sign_up.username')} required value={formData.username} onChange={handleChange} />
      <TextField
        fullWidth
        margin="normal"
        name="birthday"
        label={t('sign_up.birthday')}
        type="date"
        required
        value={formData.birthday}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        fullWidth
        margin="normal"
        name="password"
        label={t('sign_up.password')}
        type="password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="repeatPassword"
        label={t('sign_up.repeatPassword')}
        type="password"
        required
        value={formData.repeatPassword}
        onChange={handleChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="language-select-label">{t('sign_up.language')}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          name="language"
          value={formData.language}
          label={t('sign_up.language')}
          onChange={handleChange}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Deutsch">Deutsch</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const UserForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    language: '',
    birthday: '',
    isDisabled: true,
    cardId: '',
    dateOfIssuing: '',
    expiryDate: '',
  });
  const [cardImage, setCardImage] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onDrop = useCallback(acceptedFiles => {
    setCardImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...formData, cardImage });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <CommonForm formData={formData} handleChange={handleChange} />
      <FormControlLabel
        control={<Checkbox checked={formData.isDisabled} onChange={handleChange} name="isDisabled" />}
        label={t('sign_up.isDisabled')}
        sx={{marginRight: 0}}
      />
      {formData.isDisabled && (
        <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>{t('sign_up.disabilityCard.title')}</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="cardId"
            label={t('sign_up.disabilityCard.cardId')}
            value={formData.cardId}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="dateOfIssuing"
            label={t('sign_up.disabilityCard.dateOfIssuing')}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dateOfIssuing}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="expiryDate"
            label={t('sign_up.disabilityCard.expiryDate')}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
          <Box {...getRootProps()} sx={{
            mt: 2,
            p: 2,
            border: '2px dashed #ccc',
            borderRadius: 2,
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>{t('sign_up.disabilityCard.dropImageActive')}</p> :
                <p>{t('sign_up.disabilityCard.dropImage')}</p>
            }
          </Box>
          {cardImage && <Typography sx={{ mt: 1 }}>{t('sign_up.disabilityCard.fileSelected')} {cardImage.name}</Typography>}
        </Box>
      )}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleSubmit}>{t('sign_up.submit')}</Button>
      </Box>
    </Box>
  );
};


export const SignUp = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const { signUp, isLoading, error, user, resetSignUp } = useSignUpStore();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = async (formData, userType) => {
      try {
        await signUp(formData, userType);
        navigate('/events');
      } catch (error) {
          toast.error(error)
      }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('sign_up.title')}
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {user && <Alert severity="success">{t('sign_up.success')}</Alert>}

            <Box sx={{p:3}}>
                <UserForm onSubmit={(data) => handleSubmit(data, 'user')}/>
            </Box>

        </Container>
    );
}
