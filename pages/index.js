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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [gender, setGender] = useState("man");
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
      }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll("\n", "<br />"));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
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
            style={{ minHeight: "20vh", minWidth: "60vh" }}
          >
            <Grid item md={4} textAlign="center">
              <Paper elevation={24}>
                <Grid item xs={8} md={6}>
                  <Item>
                    {loading ? (
                      <div>
                        <p>Looking for the best gift ideas...</p>
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
                        textAlign="center"
                      >
                        <label>Occasion or Event</label>
                        <input
                          type="text"
                          name="ocassion"
                          placeholder="Enter the occassion or event..."
                          value={ocassion}
                          onChange={(e) => setOcassion(e.target.value)}
                        />
                        <label>For who is the gift?</label>
                        <select
                          name="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="man">Man</option>
                          <option value="woman">Woman</option>
                          <option value="woman">Couple</option>
                        </select>

                        <label>Age</label>
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

                        <label>Price from</label>
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

                        <label>Price to</label>
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

                        <label>Hobbies</label>
                        <input
                          type="text"
                          name="hobbies"
                          placeholder="Enter the hobbies"
                          value={hobbies}
                          onChange={(e) => setHobbies(e.target.value)}
                        />
                        <input type="submit" value="Generate gift ideas" />
                      </form>
                    )}
                  </Item>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </div>
    </div>
  );
}
