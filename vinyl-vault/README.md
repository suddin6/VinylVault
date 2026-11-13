_Sumaya Uddin_<br>
_Professor Amartya Sen_<br>
_CSI 3150 - Web and Mobile Systems_<br>
_November 18, 2026_<br>

# Assignment 3A - VinylVault

#### <u>User Stories (for reference)</u>:

- **Story 1 (Genre Filtering & Grid Browsing)**: As a vinyl enthusiast, I want to `filter albums by genre ("All", "Jazz", "Electronic", "Rock", "Classical") so that I can browse releases within my preferred genre`.

- **Story 2 (Album Detail View Routing)**: As a collector, I want to `click an album card to navigate to its dedicated detail view (URL: /album/:albumId) to inspect additional details like pressing weight, catalog number, speed, and stock status`.

- **Story 3 (Stateful Slide-Over Cart)**: As a shopper, I want to `add albums to my cart from catalog or detail views, and inside the cart, I should be able to update quantities (increase or decrease), delete items, and see calculated totals in an interactive cart drawer without page reloads`.

- **Story 4 (Header Cart Badge Sync)**: As a user browsing across different routes, I want `the sticky header to display an updated badge showing total item count in my cart`.

- **Story 5 (Checkout Validation & Funnel)**: As a customer completing an order, I want to `review my itemized order on a dedicated checkout route (/checkout), submit shipping details via a controlled web form, and receive an instant confirmation that resets the active cart`.

---

### **_1. Project Setup & Execution Instructions_**

- **Prerequisites:**
  - Node.js version 20+
  - Package: npm
- **Installation Procedure:**
  - `git clone https://github.com/suddin6/VinylVault`
  - `cd VinylVault`
  - `cd vinyl-vault`
  - `npm install`
- **Server Boot Script:**
  - `npm run dev` [to see developer screen]
    - open local URL in terminal (`http://localhost:5173`)
  - `npm run build` [once code is finished, build site]
  - `npm run preview` [to see user screen]
    - to open user screen, run above command and open local URL in terminal (`http://localhost:4173`)
- **Project Directory Structure:**
  - In the project directory structure, there are multiple folders within the src folder: data, components, pages, and assets. The data folder contains the data schema and the components folder has the main structural elements of the site. Assets contains media and pages has the different pages of the site such as the homepage. The main file connecting all these pages and components with the data and assets is the App.jsx that uses the react-router-dom to route all the pages together.

---

### **_2. React Component Hierarchy & State Flow Architecture_**

```
<App /> (src/App.jsx) [Owner: cart [Array] (stores active cart items), isCartOpen [Boolean] (toggles CartDrawer visibility)]
    <NavBar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)}>
        <SiteHeader>
            <Logo>
            <NavActions>
            <BtnCartBadge>
    </NavBar> (src/components/NavBar.jsx) (Sticky: Logo, Catalog Link, Cart Badge Button with item count) [Props: cartCount [Number]]
    <Routes>
        <Route path="/" element={<CatalogPage albums={ALBUMS} onAddToCart={handleAddToCart} />} /> (src/pages/CatalogPage.jsx) [Owner: selectedGenre [String] (used to filter albums by genre)] [Props: albums [Array]]
            <CatalogHero>
            <FilterBar> (Controlled button group updating selectedGenre)
            <AlbumGrid> (Responsive CSS Grid)
                <AlbumCard album={album} onAddToCart={onAddToCart} /> (src/components/AlbumCard.jsx) [.map() iterator] [Props: album [Object]]
        <Route path="/album/:id" element={<AlbumDetailPage albums={ALBUMS} onAddToCart = {handleAddToCart} />} /> (src/pages/AlbumDetailPage.jsx) [Owner: qty [Number] (tracks quantity selected before adding to cart)] [Props: albums [Array]]
            if (!album)
                <DetailError>
            <DetailContainer>
                <Breadcrumb> (Navigation Link)
                <DetailGrid> (Responsive CSS Grid)
                    <Detail Info> (category, title, price, desc, stock)
                <DetailActions> (input quantity)
        <Route path="/checkout" element={<CheckoutPage cart={cart} onClearCart = {handleClearCart} />} /> (src/pages/CheckoutPage.jsx) [Owner: isSubmitted [Boolean], formData [Object] (form input values: full name, email, shipping address, and zip code)] [Props: cart [Array]]
            if (isSubmitted)
                <CheckoutSuccess>
            if (cart.length === 0)
                <EmptyCartPage>
            <CheckoutContainer>
                <CheckoutGrid>
                    <CheckoutForm> (Organized Labels and Input Fields)
                        <FormGroup>
                        <SubmitButton>
                    <OrderSummaryCard> (Styled on the side of form)
    </Routes>
    <CartDrawer cart={cart} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveFromCart} /> (src/components/CartDrawer.jsx) [Props: cart [Array], isOpen [Boolean]]
        <DrawerOverlay onClick={onClose}>
            <DrawerPanel>
                <DrawerHeader>
                <DrawerBody>
                    if cart.length === 0
                        <EmptyCart>
                    <CartList> [.map() iterator]
```
