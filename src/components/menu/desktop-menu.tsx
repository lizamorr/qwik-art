import MenuItem from './menu-item';

export const DesktopMenu = () => {
  return (
    <div class="hidden md:flex md:flex-row md:space-x-6 md:top-0 md:h-16 md:justify-end md:px-6 md:w-fit md:right-0 fixed items-center z-50 overflow-hidden ">
      <MenuItem name="gallery" />
      <MenuItem name="contact" />
      <MenuItem name="about" />
    </div>
  );
};
