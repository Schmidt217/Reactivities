import {
  Box,
  debounce,
  List,
  ListItemButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import axios from 'axios';

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSugggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value || '');

  useEffect(() => {
    if (field.value && typeof field.value === 'object') {
      setInputValue(field.value.venue || '');
    } else {
      setInputValue(field.value || '');
    }
  }, [field.value]);

  const apiKey = import.meta.env.VITE_LOCATION_API_KEY;

  if (!apiKey) {
    throw new Error(
      'VITE_LOCATION_API_KEY is not defined in environment variables'
    );
  }

  const locationURL = `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&limit=5&dedupe=1&`;

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }

        setLoading(true);
        try {
          const res = await axios.get<LocationIQSugggestion[]>(
            `${locationURL}q=${query}`
          );
          setSuggestions(res.data);
        } catch (error) {
          console.error('error', error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [locationURL]
  );

  const handleChange = async (value: string) => {
    field.onChange(value);
    await fetchSuggestions(value);
  };

  const handleSelect = (location: LocationIQSugggestion) => {
    const city =
      location.address?.city ||
      location.address?.town ||
      location.address?.village;
    const venue = location.display_name;
    const latitude = Number(location.lat);
    const longitude = Number(location.lon);

    setInputValue(venue);
    field.onChange({ city, venue, latitude, longitude });
    setSuggestions([]);
  };

  return (
    <Box>
      <TextField
        {...props}
        value={inputValue}
        onChange={e => handleChange(e.target.value)}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {loading && <Typography>Loading...</Typography>}
      {suggestions.length > 0 && (
        <List sx={{ border: 1 }}>
          {suggestions.map(suggestion => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => {
                handleSelect(suggestion);
              }}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
