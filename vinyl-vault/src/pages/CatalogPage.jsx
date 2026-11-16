import React, { useState } from "react";
import AlbumCard from "../components/AlbumCard";

const CatalogPage = ({ albums, onAddToCart }) => {
  const genres = ["All", "Classical", "Electronic", "Jazz", "Rock"];
  const [selectedGenre, setSelectedGenre] = useState("All");

  const validAlbums = albums || [];
  const filteredAlbums =
    selectedGenre === "All"
      ? validAlbums
      : validAlbums.filter((a) => a.genre === selectedGenre);

  return (
    <div className="catalog-container">
      <header className="catalog-hero">
        <h1>Blast from the Past: Vinyls</h1>
        <p>Brand new set of vinyls with multiple genres and artists.</p>
      </header>

      <div className="filter-bar">
        {genres.map((gen) => (
          <button
            key={gen}
            type="button"
            className={`filter-pill ${selectedGenre === gen ? "active" : ""}`}
            onClick={() => setSelectedGenre(gen)}
          >
            {gen}
          </button>
        ))}
      </div>

      <div className="album-grid">
        {filteredAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} onAddToCart={onAddToCart} />
        ))}
      </div>

      <a
        href="https://www.flaticon.com/free-icons/vinyl"
        title="vinyl icons"
        className="attribute"
      >
        Vinyl icons created by Magnific - Flaticon
      </a>
    </div>
  );
};

export default CatalogPage;
