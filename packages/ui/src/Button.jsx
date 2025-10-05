export function Button({ children, ...props }) {
  return (
    <button style={{ padding: "8px 12px", borderRadius: 8 }} {...props}>
      {children}
    </button>
  );
}
