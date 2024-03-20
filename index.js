const { div, pre, code, text, textarea } = require("@saltcorn/markup/tags");
const { features, getState } = require("@saltcorn/data/db/state");

const ppArray = (v) => {
  if (!v) return "";
  if (Array.isArray(v)) return v.map((vl) => vl.toString()).join(",");
  return "";
};

const [pgvector] = {
  name: "PGVector",
  sql_name: ({ dimensions }) => `vector(${+dimensions})`,
  fieldviews: {
    show: {
      isEdit: false,
      run: (v) => pre({ class: "wsprewrap" }, code(ppArray(v))),
    },

    edit: {
      isEdit: true,
      run: (nm, v, attrs, cls) =>
        textarea(
          {
            class: ["form-control", cls],
            name: encodeURIComponent(nm),
            id: `input${encodeURIComponent(nm)}`,
            rows: 10,
          },
          typeof v === "undefined" ? "" : text(ppArray(v)) || ""
        ),
    },
  },
  attributes: [
    {
      label: "Dimensions",
      name: "dimensions",
      type: "Integer",
      required: true,
      sublabel:
        "Once set this cannot be changed. To change dimensions, delete and recreate field",
    },
  ],
  read: (v, attrs) => {
    switch (typeof v) {
      case "string":
        return v ? v.split(",") : undefined;
      default:
        return v;
    }
  },
};

module.exports = {
  sc_plugin_api_version: 1,
  types: [pgvector],
  plugin_name: "pgvector",
};
