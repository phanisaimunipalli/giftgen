import Head from "next/head";
import React from "react";
import { useState } from "react";
import styles from "./index.module.css";

import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [gender, setGender] = useState("man");
  const [gifttype, setGiftType] = useState("");
  const [age, setAge] = useState(30);
  const [ocassion, setOcassion] = useState("");
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);
  const [hobbies, setHobbies] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [result, setResult] = useState("");

  useEffect(() => {
    if (loading) {
      setShowResult(true);
    }
  }, [loading]);

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult("");
    const response = await fetch("/api/generate-gifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ocassion,
        priceMin,
        priceMax,
        gender,
        age,
        hobbies,
        gifttype,
      }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll("\n", "<br />"));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>GiftGen (by GPT 4) </title>
        <link rel="icon" href="/giftbox.png" />
      </Head>

      <div className={styles.body}>
        <main className={styles.main}>
          <h3>Gift Ideas Generator 🎁 💡</h3>
          <Grid
            spacing={0}
            direction="column"
            alignItems="center"
            textAlign="center"
            justifyContent="center"
            style={{ minHeight: "20vh", minWidth: "30vh" }}
          >
            <Grid item md={4} textAlign="center">
              <Paper elevation={14}>
                <Grid item xs={8} md={6}>
                  <Item>
                    {loading ? (
                      <div>
                        <h4>Your Gift is Going to Bring a Smile & Memory...</h4>
                        <CircularProgress />
                      </div>
                    ) : (
                      <div
                        className={styles.result}
                        dangerouslySetInnerHTML={{ __html: result }}
                      />
                    )}
                    {!loading && (
                      <form
                        style={{ margin: "auto", minHeight: "20vh" }}
                        onSubmit={onSubmit}
                        textalign="center"
                      >
                        <label>
                          {" "}
                          <b>What is the Occasion or Event?</b>
                        </label>
                        <input
                          type="text"
                          name="ocassion"
                          placeholder="Enter the occassion or event..."
                          value={ocassion}
                          required
                          onChange={(e) => setOcassion(e.target.value)}
                        />
                        <label>
                          <b>Who is going to receive the Gift?</b>
                        </label>
                        <select
                          name="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="man">Man</option>
                          <option value="woman">Woman</option>
                          <option value="woman">Couple</option>
                        </select>

                        <label>
                          <b>Age of Gift Recipient</b>
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={99}
                          name="age"
                          placeholder="Enter the age"
                          value={age}
                          onChange={(e) =>
                            setAge(Number.parseInt(e.target.value))
                          }
                        />

                        <label>
                          <b>Price from</b>
                        </label>
                        <input
                          type="number"
                          min={1}
                          name="priceMin"
                          placeholder="Enter the minimum price"
                          value={priceMin}
                          onChange={(e) =>
                            setPriceMin(Number.parseInt(e.target.value))
                          }
                        />

                        <label>
                          <b>Price to</b>
                        </label>
                        <input
                          type="number"
                          min={1}
                          name="priceMax"
                          placeholder="Enter the maximum price"
                          value={priceMax}
                          onChange={(e) =>
                            setPriceMax(Number.parseInt(e.target.value))
                          }
                        />

                        <label>
                          <b>Do they have any Hobbies or Interests?</b>
                        </label>
                        <input
                          type="text"
                          name="hobbies"
                          placeholder="Eg: Music, Painting"
                          value={hobbies}
                          onChange={(e) => setHobbies(e.target.value)}
                        />
                        <label>
                          <b>What kind of Gifts you have in mind?</b>
                        </label>
                        <select
                          name="gifttype"
                          value={gifttype}
                          onChange={(e) => setGiftType(e.target.value)}
                        >
                          <option value="creative and unique">
                            Creative & Unique
                          </option>
                          <option value="popular">Popular</option>
                          <option value="eco-friendly">Eco-Friendly</option>
                        </select>

                        <input
                          type="submit"
                          className={styles.submitFeedback}
                          value="Generate gift ideas"
                        />
                      </form>
                    )}
                  </Item>
                </Grid>
              </Paper>
              <h4>
                Now, Gift Your Friends & Family a Personalized Gift They ❤️ &
                makes them 🥰{" "}
              </h4>
              <a
                href="https://www.linkedin.com/in/iamphanisairam/"
                target="_blank"
              >
                <p> &copy; GiftGen@2023 Made with &#9829; on OpenAI's GPT</p>
              </a>
            </Grid>
          </Grid>
          {/* <div className={styles.footer}>
            <a
              href="https://www.linkedin.com/in/iamphanisairam/"
              target="_blank"
            >
              <p> &copy; GiftGen@2023 Made with &#9829; on ChatGPT</p>
            </a>
          </div> */}
        </main>
      </div>
      <Helmet>
        <script type="text/javascript">
          {`
            (function(w) {
              var s = document.createElement('script');
              s.src = '<https://survey.survicate.com/workspaces/d1bd058057ce52edc5b1b7972eeda26f/web_surveys.js>';
              s.async = true;
              var e = document.getElementsByTagName('script')[0];
              e.parentNode.insertBefore(s, e);
            })(window);
          `}
        </script>
      </Helmet>
    </div>
  );
}
