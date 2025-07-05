import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, Modal, Box, Link, useMediaQuery, useTheme, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useEventStore from './stores/eventStore';
import { format } from 'date-fns';
import { imageRoute } from "./consts/apiRoutes.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventModal = ({ event, open, handleClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : 600,
        maxWidth: '100%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        maxHeight: '90vh',
        overflow: 'auto',
      }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {event?.name}
        </Typography>
        {event?.media && event.media[0] && (
          <Box sx={{ mb: 2 }}>
            <img
              src={imageRoute(event.media[0].url)}
              alt={event.name}
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
          </Box>
        )}
        <Typography variant="h6" gutterBottom>
          {t('events.description')}
        </Typography>
        <Typography paragraph>
          {event?.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>{t('events.type')}:</strong> {event?.eventType}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>{t('events.language')}:</strong> {event?.language}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>{t('events.startTime')}:</strong> {formatDate(event?.startTime)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>{t('events.endTime')}:</strong> {formatDate(event?.endTime)}
        </Typography>
        {event?.locations && event.locations[0] && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              {t('events.location')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>{t('events.locationName')}:</strong> {event.locations[0].name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>{t('events.capacity')}:</strong> {event.locations[0].capacity}
            </Typography>
            {event.locations[0].website && (
              <Typography variant="body1" gutterBottom style={{overflowWrap: "break-word"}}>
                <strong>{t('events.website')}: </strong>
                <Link href={event.locations[0].website} target="_blank" rel="noopener noreferrer">
                  {event.locations[0].website}
                </Link>
              </Typography>
            )}
          </>
        )}
        {event?.accessibilityNeeds && event.accessibilityNeeds.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              {t('events.accessibilityNeeds')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {event.accessibilityNeeds.map((ac, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {ac.icon && (
                    <img
                      height="40"
                      width="40"
                      src={imageRoute(ac.icon.url)}
                      alt={ac.name}
                    />
                  )}
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {ac.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={handleClose}>
            {t('events.closeModal')}
          </Button>
          <Button variant="contained" color="primary">
            {t('events.book')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const EventCard = ({ event }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBook = () => {
    toast.success(t('events.bookingSuccess'), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  return (
    <>
      <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 300,
        maxHeight: 300,
        width: '100%',
        maxWidth: 345,
        position: 'relative',
      }}>
        <CardMedia
          component="img"
          height="140"
          image={imageRoute(event.media[0]?.url)}
          alt={event.name}
        />
        <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {event.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', mt: 'auto' }}>
          <Button size="small" onClick={handleOpen}>{t('events.details')}</Button>
          <Button size="small" variant="contained" color="primary" onClick={handleBook}>{t('events.book')}</Button>
        </CardActions>
      </Card>
      <EventModal event={event} open={open} handleClose={handleClose} />
    </>
  );
};

const SearchComponent = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAccessible, setIsAccessible] = useState(false);

  const handleSearch = () => {
    onSearch(searchTerm, isAccessible);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box display={"flex"}>
      <TextField
        fullWidth
        label={t('events.search')}
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
        <Button variant="contained" onClick={handleSearch} sx={{ ml: 2, height:56 }}>
          {t('events.searchButton')}
        </Button>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={isAccessible}
            onChange={(e) => setIsAccessible(e.target.checked)}
          />
        }
        label={t('events.accessibleOnly')}
      />

    </Box>
  );
};

export const Events = () => {
  const { t } = useTranslation();
  const { events, isLoading, error, fetchEvents } = useEventStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  console.log(events)
  const handleSearch = (searchTerm, isAccessible) => {
    let filtered = events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isAccessible) {
      filtered = filtered.filter(event => event.accessibilityNeeds && event.accessibilityNeeds.length > 0);
    }

    setFilteredEvents(filtered);
  };

  if (isLoading) return <Typography textAlign={"center"}>{t('events.loading')}</Typography>;
  if (error) return <Typography color="error" textAlign={"center"}>{error}</Typography>;

  return (
    <Container maxWidth={isMobile ? 'xs' : 'lg'}>
      <Typography variant="h4" component="h1" gutterBottom textAlign={isMobile ? 'center' : 'left'}>
        {t('events.title')}
      </Typography>
      <SearchComponent onSearch={handleSearch} />
      {filteredEvents.length > 0 ? (
        <Grid container spacing={3} justifyContent={isMobile ? 'center' : 'flex-start'}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography textAlign="center" sx={{ mt: 4 }}>
          {t('events.noResults')}
        </Typography>
      )}
      <ToastContainer />
    </Container>
  );
};
