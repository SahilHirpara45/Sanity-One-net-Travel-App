"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { getPlacesData, setBoundsData } from "@/store/places/places.slice";
import debounce from "lodash.debounce";
import Tooltip from "./CommonTooltip";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { BsLink45Deg } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const GoogleMapUI = () => {
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);
  const [center, setCenter] = useState({
    lat: 49.32, // Default center (e.g., BC, Canada)
    lng: -123.0724,
  });
  const [activeMarker, setActiveMarker] = useState(null);
  const [activeMarkerHover, setActiveMarkerHover] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const prevZoomRef = useRef(zoom);
  const placesData = useSelector((state) => state.places.placesData);
  const boundsData = useSelector((state) => state.places.boundsData);
  const filter = useSelector((state) => state.places.filter);
  const hoveredPlaceId = useSelector((state) => state.places.hoveredPlaceId);
  const isLoading = useSelector((state) => state.places.loading);
  const season = useSelector((state) => state.places.season);
  const month = useSelector((state) => state.places.month);
  const dateRange = useSelector((state) => state.places.dateRange);
  const travellers = useSelector((state) => state.places.travellers);

  const containerStyle = {
    width: "100%",
    height: "750px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_ACCOUNT_KEY, // Use your API key
  });

  const onLoad = (map) => {
    mapRef.current = map;
    updateMapState(); // Update bounds on initial load
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  const updateMapState = () => {
    if (mapRef.current) {
      const mapBounds = mapRef.current.getBounds();
      const zoomLevel = mapRef.current.getZoom();
      if (mapBounds) {
        const ne = mapBounds.getNorthEast();
        const sw = mapBounds.getSouthWest();

        const newBounds = {
          neLat: ne.lat(),
          swLat: sw.lat(),
          neLng: ne.lng(),
          swLng: sw.lng(),
        };

        if (
          !bounds ||
          JSON.stringify(bounds) !== JSON.stringify(newBounds) ||
          prevZoomRef.current !== zoomLevel
        ) {
          dispatch(setBoundsData(newBounds));
          setBounds(newBounds);
          setZoom(zoomLevel);
          prevZoomRef.current = zoomLevel;
        }
      }
    }
  };

  const debouncedSetCenter = useCallback(
    debounce((newCenter) => {
      setCenter(newCenter);
    }, 300),
    []
  );

  const onDragEnd = useCallback(() => {
    updateMapState();
  }, []);

  const onZoomChanged = useCallback(() => {
    updateMapState();
  }, []);

  const onCenterChanged = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const newCenter = {
        lat: center.lat(),
        lng: center.lng(),
      };
      debouncedSetCenter(newCenter);
    }
  }, [debouncedSetCenter]);

  useEffect(() => {
    if (bounds) {
      dispatch(
        getPlacesData({
          ...bounds,
          filter,
          season,
          month,
          // dateRange,
          travellers,
        })
      );
    }
  }, [bounds, filter, dispatch]);

  const handleMarkerHover = (marker) => {
    setActiveMarkerHover(marker);
  };

  const handleMarkerClick = (place) => {
    // Set InfoWindow position and active marker
    setInfoWindowPosition({
      lat: place.location.lat,
      lng: place.location.lng,
    });
    setActiveMarker(place); // Pass the place object to activeMarker
  };

  const closeInfoWindow = () => {
    setActiveMarker(null);
    setInfoWindowPosition(null);
  };

  return (
    <div className="rounded-[32px] overflow-hidden">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onDragEnd={onDragEnd}
          onZoomChanged={onZoomChanged}
          onCenterChanged={onCenterChanged}
        >
          <MarkerClusterer
          // styles={{ textColor: "#fff", backgroundColor: "#F77E2D" }}
          >
            {(clusterer) =>
              placesData.map((place) => (
                <Marker
                  key={place._id}
                  position={{
                    lat: place.location.lat,
                    lng: place.location.lng,
                  }}
                  clusterer={clusterer}
                  icon={{
                    url: place.icon,
                    scaledSize: new window.google.maps.Size(
                      activeMarkerHover?._id === place._id ||
                      hoveredPlaceId === place._id
                        ? 42
                        : 28,
                      activeMarkerHover?._id === place._id ||
                      hoveredPlaceId === place._id
                        ? 42
                        : 28
                    ),
                    fillColor:
                      activeMarkerHover?._id === place._id ||
                      hoveredPlaceId === place._id
                        ? "#F77E2D"
                        : "#000000",
                  }}
                  onMouseOver={() => handleMarkerHover(place)}
                  onMouseOut={() => handleMarkerHover(null)}
                  onClick={() => handleMarkerClick(place)}
                />
              ))
            }
          </MarkerClusterer>

          {infoWindowPosition && activeMarker && (
            <InfoWindow
              position={infoWindowPosition}
              onCloseClick={closeInfoWindow}
            >
              <Tooltip
                title={activeMarker?.title}
                image={urlFor(activeMarker?.image).url()}
                link={activeMarker?.link}
                onClose={closeInfoWindow}
              />
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GoogleMapUI;
