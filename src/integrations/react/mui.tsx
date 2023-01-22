/** @jsxImportSource react */

import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  CheckRounded,
  HourglassEmptyRounded,
  SendRounded,
} from "@mui/icons-material";

import { qwikify$ } from "@builder.io/qwik-react";

export const RightArrow = qwikify$(ArrowForwardIosRounded);
export const LeftArrow = qwikify$(ArrowBackIosRounded);
export const SendIcon = qwikify$(SendRounded);
export const Check = qwikify$(CheckRounded);
export const LoadingIcon = qwikify$(HourglassEmptyRounded);
