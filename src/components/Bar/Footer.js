function Footer() {
  return (
    <>
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "8%",
          color: "red",
          a: { color: "red" },
          //border: '1px solid',
          backgroundColor: "#CCC", // Optional: Add a background color
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <a href="https://github.com/RockZhangCn/red2_react/blob/master/README.md">
            How to play
          </a>
        </div>
        <div style={{ marginLeft: "80px", color: "red" }}>
          built by&nbsp;{" "}
          <a href="mailto:rock.zhang.cn@gmail.com">rock.zhang.cn@gmail.com</a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
