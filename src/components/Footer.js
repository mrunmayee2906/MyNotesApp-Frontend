const Footer = (props) => {
  const day = new Date();
  const year = day.getFullYear();

  return (
    <footer className={props.className}>
      <p>Copyright &copy; NotesApp {year}</p>
      {/* <p>Made with by Mrunmayee Gaikwad</p> */}
    </footer>
  );
};

export default Footer;
