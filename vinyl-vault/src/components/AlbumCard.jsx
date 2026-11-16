import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ album, onAddToCart }) => {
  if (!album) return null;
  return (
    <article className="album-card">
      <Link to={`/album/${album.id}`} className="album-link">
        <img
          className="album-image"
          src={album.image}
          alt={album.name}
          loading="lazy"
        />
      </Link>
      <div className="album-body">
        <span className="album-genre">{album.genre}</span>
        <h2 className="album-title">
          <Link to={`/album/${album.id}`}>{album.title}</Link>
        </h2>
        <h3 className="album-artist">{album.artist}</h3>
        <p className="album-price">
          $
          {typeof album.price === "number"
            ? album.price.toFixed(2)
            : "Contact for Price"}
        </p>
        <button
          className="btn btn-secondary btn-block"
          type="button"
          onClick={() => onAddToCart(album)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default AlbumCard;
