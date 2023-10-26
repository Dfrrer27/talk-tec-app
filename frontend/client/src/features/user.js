// Gestiona el estado del usuario en una aplicación React con Redux Toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Función asincrona llamada 'register'
export const register = createAsyncThunk('users/register', async ({codigo, email, nombre, apellido, carrera, password}, thunkAPI) => {
  // Convierte los datos en una cadena JSON
  const body = JSON.stringify({
    codigo,
    email,
    nombre,
    apellido,
    carrera,
    password
  });

  try{
    // Realiza solicitud POST para registrar al usuario
    const res = await fetch('http://localhost:8000/api/users/register', { // funciono porque puse toda la ruta completa de register
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await res.json();

    // Retorna los datos si la solicitud es exitosa
    if (res. status === 201) {
      return data
    } else {
      // Rechaza la promesa con los datos del error si hay error
      return thunkAPI.rejectWithValue(data);
    }

  }catch(err){
    // Rechaza la promesa con los datos del error si hay error en la solicitud
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// Función asincrona llamada 'getUser'
const getUser = createAsyncThunk('users/me', async (_, thunkAPI) => {
	try {
    // Realiza solicitud GET para obtener los datos del usuario autenticado
		const res = await fetch('/api/users/me', {
			method: 'GET',
			headers: {
				Accept: 'application/json', 
			},
		});

		const data = await res.json();

		if (res.status === 200) {
			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const login = createAsyncThunk('users/login', async ({ email, password}, thunkAPI) => {
  const body = JSON.stringify({
    email,
    password
  });

  try{
    const res = await fetch('/api/users/login', { 
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
      credentials: 'include', // Incluye las credenciales (cookies) en la solicitud
    });

    const data = await res.json();

    if (res. status === 200) {
      const { dispatch } = thunkAPI;

      // Realiza una acción para obtener los datos del usuario autenticado
      dispatch(getUser());

      // Retorna los datos de la respuesta
      return data
    } else {
      return thunkAPI.rejectWithValue(data);
    }

  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// Estado inicial del slice de usuario
const initialState = { 
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
}

// Slice de Redux que maneja el estado del usuario
const userSlice = createSlice({
  name: 'user', // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    resetRegistered: state => {
      state.registered = false;
    }
  },
  extraReducers: builder => {
    // Maneja las acciones asincrónicas generadas por 'createAsyncThunk'
    builder.addCase(register.pending, state => {
      state.loading = true;
    })
    .addCase(register.fulfilled, state => {
      state.loading = false;
      state.registered = true;
    })
    .addCase(register.rejected, state => {
      state.loading = false;
    })
    .addCase(login.pending, state => {
      state.loading = true;
    })
    .addCase(login.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = true;
    })
    .addCase(login.rejected, state => {
      state.loading = false;
    })
    .addCase(getUser.pending, state => {
      state.loading = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(getUser.rejected, state => {
      state.loading = false;
    })
  },
});

// Exporta las acciones y el reducer del slice de usuario
export const { resetRegistered } = userSlice.actions
export const userReducer = userSlice.reducer;