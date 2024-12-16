import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "@/lib/sanity";

const iconsMap = {
  Adventure: "../assets/mapIcons/adventure.svg",
  "Arts & Culture": "../assets/mapIcons/arts-culture.svg",
  Attractions: "../assets/mapIcons/attractions.svg",
  "Family & Kids": "../assets/mapIcons/family-kids.svg",
  "Nature & Sightseeing": "../assets/mapIcons/nature-sightseeing.svg",
  "Outdoor Tours": "../assets/mapIcons/outdoor-tours.svg",
  "Shopping & Entertainment": "../assets/mapIcons/shopping.svg",
  Wellbeing: "../assets/mapIcons/wellbeing.svg",
};

export const getPlacesData = createAsyncThunk(
  "places/getPlacesData",
  async ({
    swLat,
    swLng,
    neLat,
    neLng,
    filter,
    season,
    month,
    dateRange,
    travellers,
  }) => {
    // console.log(season,month,travellers,"season in getPlacesData");

    // Optional filters
    const filterQuery = filter ? `&& placeType == '${filter}'` : "";
    const seasonQuery = season ? `&& season == '${season}'` : "";
    const monthQuery = month ? `&& month == '${month}'` : "";
    const travellersQuery = travellers
      ? `&& travellers == '${travellers}'`
      : "";

    // Date range filter (handles startDate and endDate)
    const dateRangeQuery =
      dateRange && dateRange.startDate && dateRange.endDate
        ? `&& dateRange.startDate >= '${dateRange.startDate}' && dateRange.endDate <= '${dateRange.endDate}'`
        : "";

    // Bounding box (map bounds) filter
    const boundsQuery =
      swLat && swLng && neLat && neLng
        ? `&& location.lat >= ${swLat} && location.lng >= ${swLng} && location.lat <= ${neLat} && location.lng <= ${neLng}`
        : "";

    // Combine all filters into a single query
    const query = `
      *[_type == 'places' ${filterQuery} ${seasonQuery} ${monthQuery} ${travellersQuery} ${dateRangeQuery} ${boundsQuery}] {
        _id,
        title,
        image,
        city,
        country,
        placeType,
        match,
        location,
        season,
        month,
        date,
        travellers
      }`;

    try {
      const data = await client.fetch(query);
      // console.log("Data fetched successfully:", data);

      return data.map((place) => ({
        ...place,
        icon: iconsMap[place.placeType] || null,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

export const placesSlice = createSlice({
  name: "places",
  initialState: {
    placesData: [],
    loading: false,
    error: null,
    boundsData: null,
    filter: "",
    hoveredPlaceId: null,
    season: "",
    month: "",
    dateRange: {
      startDate: null,
      endDate: null,
    },
    travellers: "",
  },
  reducers: {
    setBoundsData: (state, action) => {
      state.boundsData = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setHoveredPlace(state, action) {
      state.hoveredPlaceId = action.payload;
    },
    setSeason(state, action) {
      state.season = action.payload;
    },
    setMonth(state, action) {
      state.month = action.payload;
    },
    setDateRange(state, action) {
      state.dateRange = action.payload;
    },
    setTravelers: (state, action) => {
      state.travellers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlacesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlacesData.fulfilled, (state, action) => {
      state.placesData = action.payload;
      state.loading = false;
    });
    builder.addCase(getPlacesData.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const {
  setBoundsData,
  setFilter,
  setHoveredPlace,
  setSeason,
  setMonth,
  setDateRange,
  setTravelers,
} = placesSlice.actions;
export default placesSlice.reducer;
