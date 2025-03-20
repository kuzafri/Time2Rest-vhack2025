export const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      // Don't trigger if the click is inside the element
      if (el === event.target || el.contains(event.target)) {
        return;
      }

      // Execute the provided function
      binding.value(event);
    };

    // Use mousedown instead of click for better UX
    // Add a slight delay to make sure we don't close immediately
    document.addEventListener("mousedown", el._clickOutside);
  },

  unmounted(el) {
    document.removeEventListener("mousedown", el._clickOutside);
  },
};
