import { createSerializer } from "./serializer";
import { expect } from "vitest";

expect.addSnapshotSerializer(createSerializer());
