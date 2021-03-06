import React, { useState, useEffect } from "react"

import useSWR from "swr"

import ClipLoader from "react-spinners/ClipLoader"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const styles = require("./meh.module.scss")

export const fetcher = url => fetch(url).then(r => r.json())

export interface MehData {
  name: string
  price: string
  priceLink: string
  image?: string
}

export interface MehPageResponse {
  mehdata: MehData
  isLoading: boolean
  isError: boolean
}

export const useMeh = (): MehPageResponse => {
  const { data, error } = useSWR("/api/meh", fetcher)

  return {
    mehdata: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default function Meh() {
  let { mehdata, isLoading, isError } = useMeh()

  return (
    <>
      {(!mehdata || isLoading) && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <ClipLoader size={60} color="fff" loading={isLoading} />{" "}
          <p style={{ marginLeft: "8px" }}>Loading Meh's Product of the day.</p>
        </div>
      )}

      {mehdata && !isLoading && (
        <>
          <Card
            style={{
              width: "500px",
              height: "200px",
              marginTop: "2rem",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                flexFlow: "column nowrap",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <img src={mehdata.image} />
              {/* {mehdata.image} */}
              <Typography
                color="textPrimary"
                variant="h5"
                component="h5"
                gutterBottom
              >
                {mehdata.name}
              </Typography>
              <Typography variant="h5" component="h5">
                {mehdata.price}
              </Typography>
              <div className={styles.buttonWrapper}>
                <Button href="https://meh.com" variant="contained">
                  Go to Meh
                </Button>

                <Button
                  href={`https://meh.com/${mehdata.priceLink}`}
                  variant="contained"
                  color="primary"
                >
                  Buy
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}
