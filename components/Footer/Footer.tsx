import css from "@/components/Footer/Footer.module.css"

const Footer = () => {
  return (
    <footer className={css.footer}>
  <div className={css.container }>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Dmytro Kravets</p>
      <p>
        Contact us:
        <a href="mailto:dima2.kravet@gmail.com"> dima2.kravet@gmail.com</a>
      </p>
    </div>
  </div>
</footer>
  );
};

export default Footer;
