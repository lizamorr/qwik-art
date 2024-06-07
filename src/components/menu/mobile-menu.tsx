import Footer from "../footer/footer";
import MenuItem from "./menu-item";

export const MobileMenu = (props: { isOpen: boolean }) => {
  return (
    <div
      class={`fixed top-12 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 overflow-hidden px-6 py-10 flex flex-col justify-between ${props.isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div class="space-y-10">
        <MenuItem name="home" />
        <MenuItem name="gallery" />
        <MenuItem name="contact" />
        <MenuItem name="about" />
      </div>
      <div class="mb-2">
        <Footer />
      </div>
    </div>
  );
};
