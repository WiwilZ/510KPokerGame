import engine from "engine";

@engine.decorators.serialize("MissingScriptableAsset")
export default class DefaultScriptableAsset extends engine.ScriptableAsset {
  public __content
  public __meta
  public __missing = true

  public static DeserializeResource(content, meta) {
    const sa = new DefaultScriptableAsset()
    sa.__content = content
    sa.__meta = meta
    return sa
  }

  public changeUuid(uuid) {
    this.__meta._scriptuuid = uuid
  }

  public SerializeResource() {
    return {
      content: {
        content: this.__content,
        meta: this.__meta,
      },
      meta: {},
    }
  }
}
