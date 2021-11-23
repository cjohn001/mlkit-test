import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import {
  BarcodeFormats,
  DetectionType,
  MLKitView,
} from "@nativescript/mlkit-core";
import { BarcodeResult } from "@nativescript/mlkit-barcode-scanning";
import { EventData } from "@nativescript/core";
@Component({
  selector: "ns-items",
  templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
  private _barcodeScannerRunning = true;
  public _detectionType: DetectionType = DetectionType.Barcode;
  public _barcode: string;

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
  public onDetection(data: BarcodeResult, type: DetectionType) {
    if (type === DetectionType.Barcode) {
      const barcode: BarcodeResult = data;
      this._barcode = JSON.stringify(barcode);
      console.log("Barcode = " + barcode);
    }
  }
  //////////////////////////////////////////////////////////////////////
  public onTap(args: EventData) {
    if (this._scanner) {
      const scanner = this._scanner.nativeElement as MLKitView;
      if (this._barcodeScannerRunning) {
        scanner.stopPreview();
      } else {
        scanner.startPreview();
      }
      this._barcodeScannerRunning = !this._barcodeScannerRunning;
    }
  }
}
