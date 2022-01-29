import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import {
  BarcodeFormats,
  DetectionEvent,
  DetectionType,
  MLKitView,
} from "@nativescript/mlkit-core";
import { EventData } from "@nativescript/core";
@Component({
  selector: "ns-items",
  templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
  public _detectionType: DetectionType = DetectionType.Barcode;
  public _barcode: string;
  public _pause = true;
  public _torchEnabled = true;

  public _barcodeFormats: BarcodeFormats[];

  @ViewChild("idScanner", { read: ElementRef, static: true })
  _scanner: ElementRef;

  //////////////////////////////////////////////////////////////////////
  constructor() {}
  //////////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this._barcodeFormats = [
      BarcodeFormats.EAN_13,
      BarcodeFormats.EAN_8,
      BarcodeFormats.UPC_A,
      BarcodeFormats.UPC_E,
    ];
  }
  //////////////////////////////////////////////////////////////////////
  public onDetection(args: DetectionEvent) {
    if (args.type === DetectionType.Barcode) {
      const barcode = args.data;
      this._barcode = JSON.stringify(barcode);
      console.log("Barcode = " + this._barcode);
    }
  }
  //////////////////////////////////////////////////////////////////////
  public onTapTorch(args: EventData) {
    this._torchEnabled = !this._torchEnabled;
  }
  //////////////////////////////////////////////////////////////////////
  public onTapPause(args: EventData) {
    this._pause = !this._pause;
  }
  //////////////////////////////////////////////////////////////////////
  public onMLKitViewLoaded(args: any) {
    const scanner = args.object as MLKitView;
    if (!scanner.hasCameraPermission()) {
      scanner.requestCameraPermission();
    }
  }
}
